import { Request, Response } from "express";
import Design from "../models/design.model";
import { uploadToCloudinary } from "../utils/cloudinary";

export const createDesign = async (req: Request, res: Response) => {
  try {
    const { title, description, category, tags, isFeatured, isActive } =
      req.body;
    const artistId = req.user?._id || req.body.artistId;

    const files = Array.isArray(req.files)
      ? req.files
      : Object.values(req.files || {}).flat();

    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one design image is required." });
    }

    const uploadedImages = [];

    for (const file of files) {
      try {
        const result = await uploadToCloudinary(
          file.buffer,
          "Indu_Mehendi/designs"
        );
        uploadedImages.push({
          public_id: result.public_id,
          url: result.secure_url,
          altText: title,
        });
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res
          .status(500)
          .json({ message: "Failed to upload one or more images." });
      }
    }

    if (uploadedImages.length === 0) {
      return res
        .status(500)
        .json({ message: "Image upload failed. No images were processed." });
    }

    const formattedTags =
      typeof tags === "string"
        ? tags.split(",").map((t) => t.trim())
        : Array.isArray(tags)
        ? tags
        : [];

    const newDesign = await Design.create({
      artist: artistId,
      title,
      description,
      images: uploadedImages,
      category,
      tags: formattedTags,
      isFeatured: isFeatured ?? false,
      isActive: isActive ?? true,
      likesCount: 0,
    });

    res
      .status(201)
      .json({ message: "Design created successfully", design: newDesign });
  } catch (error) {
    console.error("Design creation error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllDesigns = async (req: Request, res: Response) => {
  try {
    const designs = await Design.find()
      .populate("artist", "firstName lastName avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({ designs });
  } catch (error) {
    console.error("Design fetching error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getDesign = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const design = await Design.findById(id).populate(
      "artist",
      "firstName lastName avatar"
    );

    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }

    res.status(200).json(design);
  } catch (error) {
    console.error("Design fetching error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
