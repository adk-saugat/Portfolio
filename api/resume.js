import { timingSafeEqual } from "node:crypto";
import { get, put } from "@vercel/blob";

const RESUME_PATH = "resume/SaugatAdhikariResume.pdf";
const MAX_PDF_BYTES = 3 * 1024 * 1024;
const STORE_ACCESS = ["private", "public"];

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

function codesMatch(input, secret) {
  if (typeof input !== "string" || typeof secret !== "string" || !secret) {
    return false;
  }
  const given = Buffer.from(input);
  const expected = Buffer.from(secret);
  if (given.length !== expected.length) return false;
  return timingSafeEqual(given, expected);
}

function blobMessage(error) {
  const message = error instanceof Error ? error.message : "";
  return message.replace(/^Vercel Blob:\s*/, "");
}

async function readResume() {
  for (const access of STORE_ACCESS) {
    try {
      const result = await get(RESUME_PATH, { access, useCache: false });
      if (result?.statusCode === 200 && result.stream) return result;
    } catch {
      // A private store rejects a public read, and the reverse is also true.
    }
  }
  return null;
}

async function saveResume(bytes) {
  let lastError;
  for (const access of STORE_ACCESS) {
    try {
      await put(RESUME_PATH, bytes, {
        access,
        contentType: "application/pdf",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      return;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

export default async function handler(req, res) {
  if (req.method === "GET" || req.method === "HEAD") {
    const file = await readResume();
    if (!file) {
      res.status(404).end();
      return;
    }
    if (req.method === "HEAD") {
      res.status(200).end();
      return;
    }

    const bytes = Buffer.from(await new Response(file.stream).arrayBuffer());
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="SaugatAdhikariResume.pdf"',
    );
    res.setHeader("Cache-Control", "no-store");
    res.status(200).send(bytes);
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, HEAD, POST");
    res.status(405).json({ error: "That action is not available." });
    return;
  }

  const adminCode = process.env.ADMIN_CODE;
  if (!adminCode) {
    res.status(500).json({
      error: "ADMIN_CODE is not available to this deployment. Add it in Vercel, then redeploy.",
    });
    return;
  }

  const code = req.body?.code;
  const pdf = req.body?.pdf;
  if (!codesMatch(code, adminCode)) {
    res.status(401).json({ error: "That code is not right." });
    return;
  }
  if (typeof pdf !== "string" || pdf.length === 0) {
    res.status(400).json({ error: "Choose a PDF to upload." });
    return;
  }

  let bytes;
  try {
    bytes = Buffer.from(pdf, "base64");
  } catch {
    res.status(400).json({ error: "That file could not be read." });
    return;
  }

  if (bytes.length > MAX_PDF_BYTES) {
    res.status(400).json({ error: "Use a PDF smaller than 3 MB." });
    return;
  }
  if (bytes.subarray(0, 5).toString() !== "%PDF-") {
    res.status(400).json({ error: "Upload a PDF file." });
    return;
  }

  try {
    await saveResume(bytes);
  } catch (error) {
    const message = blobMessage(error);
    if (message.includes("No blob credentials") || message.includes("No read-write token")) {
      res.status(500).json({
        error: "The Blob store is not connected to this deployment. Connect it in Vercel, then redeploy.",
      });
      return;
    }
    res.status(500).json({
      error: message || "The PDF could not be saved.",
    });
    return;
  }

  res.status(200).json({ ok: true });
}
