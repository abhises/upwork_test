"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const postSchema_1 = require("../schemas/postSchema");
const prisma_1 = __importDefault(require("../prisma"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseResult = postSchema_1.postSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(400).json({
            error: "Validation failed",
            details: parseResult.error.errors,
        });
        return;
    }
    const { title, description } = parseResult.data;
    try {
        const post = yield prisma_1.default.post.create({ data: { title, description } });
        res.status(201).json(post); // fixed order: set status first, then json
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create post" });
    }
});
exports.createPost = createPost;
const getPosts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield prisma_1.default.post.findMany();
    res.json(posts);
});
exports.getPosts = getPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const post = yield prisma_1.default.post.findUnique({ where: { id: Number(id) } });
    post ? res.json(post) : res.status(404).json({ error: "Post not found" });
});
exports.getPostById = getPostById;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const parseResult = postSchema_1.postSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(400).json({
            error: "Validation failed",
            details: parseResult.error.errors,
        });
        return;
    }
    const { title, description } = parseResult.data;
    try {
        const post = yield prisma_1.default.post.update({
            where: { id: Number(id) },
            data: { title, description },
        });
        res.status(200).json(post);
    }
    catch (error) {
        res.status(404).json({ error: "Post not found or update failed" });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma_1.default.post.delete({ where: { id: Number(id) } });
        res.json({ message: "Post deleted" });
    }
    catch (_a) {
        res.status(404).json({ error: "Post not found or delete failed" });
    }
});
exports.deletePost = deletePost;
