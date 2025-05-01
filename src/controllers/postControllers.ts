import { Request, Response } from "express";
import { postSchema } from "../schemas/postSchema";
import prisma from "../prisma";

export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const parseResult = postSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      error: "Validation failed",
      details: parseResult.error.errors,
    });
    return;
  }

  const { title, description } = parseResult.data;

  try {
    const post = await prisma.post.create({ data: { title, description } });
    res.status(201).json(post); // fixed order: set status first, then json
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

export const getPosts = async (_req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
};

export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  post ? res.json(post) : res.status(404).json({ error: "Post not found" });
};

export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const parseResult = postSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      error: "Validation failed",
      details: parseResult.error.errors,
    });
    return;
  }

  const { title, description } = parseResult.data;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, description },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: "Post not found or update failed" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({ where: { id: Number(id) } });
    res.json({ message: "Post deleted" });
  } catch {
    res.status(404).json({ error: "Post not found or delete failed" });
  }
};
