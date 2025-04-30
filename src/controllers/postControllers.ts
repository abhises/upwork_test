import { Request, Response } from "express";
import prisma from "../prisma";

export const createPost = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const post = await prisma.post.create({ data: { title, description } });
    res.json(post);
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

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, description },
    });
    res.json(post);
  } catch {
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
