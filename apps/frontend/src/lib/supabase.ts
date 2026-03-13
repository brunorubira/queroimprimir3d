import { createClient } from "@supabase/supabase-js";

// Ensure you have these in your .env.local file:
// NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT_REF].supabase.co
// NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Uploads a reference image file to the Supabase storage bucket.
 * @param file The file snippet to upload (e.g., from an <input type="file" />)
 * @returns The public URL of the uploaded image
 */
export async function uploadReferenceImage(file: File): Promise<string> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase credentials are not configured.");
  }

  // Create a unique file name to avoid collisions
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from('reference-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from('reference-images')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}
