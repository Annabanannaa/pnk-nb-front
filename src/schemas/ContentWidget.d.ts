export interface ContentWidgetItem <T> {
    id: number; // Пока не приходит
    block_type: string;
    block_size: number;
    data: T
    children: ContentWidgetItem[]
}

export interface ContentWidget {
    id: number; // Пока не приходит
    block_size: number;
    blocks: ContentWidgetItem[];
}
