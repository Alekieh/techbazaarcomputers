"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X, Check, Image as ImageIcon, Loader2 } from "lucide-react";

interface CloudinaryUploaderProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
}

export function CloudinaryImageUploader({
  onImageUploaded,
  currentImage,
}: CloudinaryUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [dragActive, setDragActive] = useState(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "tech-bazaar-kenya";

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setUploading(true);

    try {
      // 1. Create a local preview
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);

      // 2. Prepare Form Data for Cloudinary Upload API
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // Default unsigned preset or auto preset

      // 3. Upload to Cloudinary API
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        setPreview(data.secure_url);
        onImageUploaded(data.secure_url);
      } else {
        // Fallback: If no preset configured, send base64 to server handler
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64data = reader.result as string;
          const serverRes = await fetch("/api/admin/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl: base64data, cloudName }),
          });
          const serverData = await serverRes.json();
          if (serverData.url) {
            setPreview(serverData.url);
            onImageUploaded(serverData.url);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      {/* Drag and Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
          dragActive
            ? "border-gold bg-gold/10 scale-[1.01]"
            : "border-slate-800 bg-slate-950/80 hover:border-gold/60 hover:bg-slate-900/60"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(e.target.files[0]);
            }
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div className="flex flex-col items-center justify-center gap-2">
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-gold animate-spin" />
              <p className="text-xs font-mono font-bold text-gold">
                Uploading photo to Cloudinary CDN...
              </p>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center border border-gold/30">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Click to Choose Laptop Photo from Computer
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  or drag and drop JPG, PNG, WEBP files here
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-md">
                Direct Cloudinary CDN Sync
              </span>
            </>
          )}
        </div>
      </div>

      {/* Image Preview Box */}
      {Boolean(preview && preview.trim()) && (
        <div className="relative w-full h-40 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden group">
          <Image
            src={preview || "/images/products/hp-elitebook-g8.jpg"}
            alt="Uploaded Preview"
            fill
            className="object-contain"
          />
          <div className="absolute top-2 right-2 bg-slate-950/90 border border-emerald-500/40 text-emerald-400 font-mono font-bold text-[10px] px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-lg">
            <Check className="w-3 h-3" />
            <span>Cloudinary Hosted</span>
          </div>
        </div>
      )}
    </div>
  );
}
