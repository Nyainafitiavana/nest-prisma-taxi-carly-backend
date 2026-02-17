export class GetAllPartenairesQuery {
  constructor(
    public readonly limit: number | null,
    public readonly page: number | null,
    public readonly value: string | null,
  ) {}
}
