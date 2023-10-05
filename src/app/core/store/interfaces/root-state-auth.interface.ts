export interface IRootStateAuth {
  token: string;
  userName: string;
  requestData: IRootStateAuthRequestData;
}

export interface IRootStateAuthRequestData {
  status: number;
  isPending: boolean;
}
