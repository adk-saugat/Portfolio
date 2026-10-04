import { timingSafeEqual } from "node:crypto";
import { head, put } from "@vercel/blob";

const RESUME_PATH = "resume/SaugatAdhikariResume.pdf";
const MAX_PDF_BYTES = 3 * 1024 * 1024;

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

async function findResume() {
  try {
    return await head(RESUME_PATH);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method === "GET" || req.method === "HEAD") {
    const blob = await findResume();
    if (!blob) {
      res.status(404).end();
      return;
    }
    if (req.method === "HEAD") {
      res.status(200).end();
      return;
    }

    const file = await fetch(blob.url);
    if (!file.ok) {
      res.status(404).end();
      return;
    }
    const bytes = Buffer.from(await file.arrayBuffer());
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
  if (!adminCode || !process.env.BLOB_READ_WRITE_TOKEN) {
    res.status(500).json({
      error: "Resume upload is not configured on Vercel yet.",
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

  await put(RESUME_PATH, bytes, {
    access: "public",
    contentType: "application/pdf",
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  res.status(200).json({ ok: true });
}
