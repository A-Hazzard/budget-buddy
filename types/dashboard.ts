export type Types = {
  name: string;
  planned: number;
  spent: number;
};

export type Groups = {
  id?: string;
  types?: Array<Types>;
  title: string;
  user_id?: string;
};

export type Income = {
  id?: string;
  types?: Array<Types>;
  user_id?: string;
};
