import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IBlog {
  id: string;
  title: string;
  content: string;
  author?: string;
}

export interface BlogsContext {
  blogslist: IBlog[];
}

const initialState: BlogsContext = {
  blogslist: [],
};

export const blogReducer = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    getBlogs: (state: any, action: PayloadAction<IBlog[]>) => {
      state.blogslist = action.payload;
    },
    addBlog: (state: any, action: PayloadAction<IBlog>) => {
      state.blogslist.push(action.payload);
    },
    removeBlog: (state: any, action: PayloadAction<string>) => {
      state.blogslist = state.blogslist.filter(
        (blog: any) => blog.id !== action.payload
      );
    },
    updateBlog: (state: any, action: PayloadAction<IBlog>) => {
      state.blogslist = state.blogslist.map((blog: any) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    getBlog: (state: any, action: PayloadAction<IBlog>) => {
      state.blogslist = state.blogslist.map((blog: any) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    addBlogs: (state: any, action: PayloadAction<IBlog[]>) => {
      state.blogslist.push(...action.payload);
    },
  },
});

export const { addBlog, removeBlog, updateBlog, addBlogs, getBlogs, getBlog } =
  blogReducer.actions;

export default blogReducer.reducer;
