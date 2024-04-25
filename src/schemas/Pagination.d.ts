export interface PaginatedData<P> {
    count: number;
    next: string|null;
    previous: string|null;
    results: Array<P>;
}
