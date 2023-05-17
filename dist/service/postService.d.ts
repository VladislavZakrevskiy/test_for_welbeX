declare class postsService {
    getPost(id: string): Promise<import(".prisma/client").Post>;
    getPostsUser(id: string, limit?: number, page?: number): Promise<any>;
    getPosts(limit: number, page: number): Promise<import(".prisma/client").Post[]>;
    createPost(message: string, id: string, media: string[]): Promise<import(".prisma/client").Post>;
    updatePost(message: string, id: string): Promise<import(".prisma/client").Post>;
}
declare const _default: postsService;
export default _default;
