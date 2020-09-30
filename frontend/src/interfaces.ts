export interface GreetingBannerProps {
  username: string | null; 
  logout(): void;
}

export interface User {
  username: string | null;
  token: string | null;
}

export interface UserPageProps {
  user: User;
}

export interface NewDeckFormProps { 
  userToken: string;
  show: boolean;
  closeModal(): void;
}