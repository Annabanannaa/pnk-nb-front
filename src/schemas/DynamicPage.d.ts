export interface DynamicPage {
    id: number;
    name: string;
    url: string;
    content: string;
    type: 'page' | 'menu' | 'link';
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    children?: DynamicPage[];
}
// export interface DynamicPage {
//     id: number;
//     slug: string;
//     title: string;
//     url: string;
//     createdAt: string;
//     updatedAt: string;
//     content: {
//         id: number;
//         text: string;
//     },
//     metaTitle: string;
//     metaDescription: string;
//     metaKeywords: string;
// }
