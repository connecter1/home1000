import * as postsModel from '../models/taskModel.js';
import * as usersModel from '../models/userModel.js';

async function postByUser(post) {
  const user = await usersModel.findUserByID(post.userId);
  return { ...post, user: { id: user.id, username: user.username }};
}

export default {
  async getAllPosts(req, res, next) {
    try {
      const filters = {};
      if (req.query.id) filters.id = req.query.id;
      const posts = await postsModel.getAllPosts(filters);
      const postsAll = await Promise.all(posts.map(postByUser));
      res.json({ status: 'ok', posts: postsAll });
    } catch (err) {
      next(err);
    }
  },

  async getPost(req, res, next) {
    try {
      const post = await postsModel.getPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ status: 'error', message: 'post not found' });
      }
      const postAll = await postByUser(post);
      res.json({ status: 'ok', post: postAll });
    } catch (err) {
      next(err);
    }
  },

  async createPost(req, res, next) {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ status: 'error', message: 'title and content required' });
      }
      const userId = req.user.id;
      const newPost = await postsModel.createPost({ title, content, userId });
      const postAll = await postByUser(newPost);
      res.status(201).json({ status: 'ok', post: postAll });
    } catch (err) {
      next(err);
    }
  },

  async updatePost(req, res, next) {
    try {
      const post = await postsModel.getPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ status: 'error', message: 'post not found' });
      }
      if (post.userId !== req.user.id) {
        return res.status(403).json({ status: 'error', message: 'cannot edit another user’s post' });
      }

      const updated = await postsModel.updatePost(req.params.id, req.body);
      const postAll = await postByUser(updated);
      res.json({ status: 'ok', post: postAll });
    } catch (err) {
      next(err);
    }
  },

  async deletePost(req, res, next) {
    try {
      const post = await postsModel.getPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ status: 'error', message: 'post not found' });
      }
      if (post.userId !== req.user.id) {
        return res.status(403).json({ status: 'error', message: 'cannot delete another users post' });
      }

      const deleted = await postsModel.deletePost(req.params.id);
      if (!deleted) {
        return res.status(500).json({ status: 'error', message: 'failed to delete post' });
      }
      res.json({ status: 'ok', message: 'post deleted successfully' });
    } catch (err) {
      next(err);
    }
  },
};