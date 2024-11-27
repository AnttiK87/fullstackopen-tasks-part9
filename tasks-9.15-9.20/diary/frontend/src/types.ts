export interface DiaryEntry {
  id: number;
  date: string;
  weather: "sunny" | "rainy" | "cloudy" | "windy" | "stormy";
  visibility: "great" | "good" | "ok" | "poor";
  comment?: string;
}

export type NewEntryStyle = Omit<DiaryEntry, "id">;

export interface FormData {
  date: string;
  radioGroup1: string;
  radioGroup2: string;
  textInput: string;
}

export type NewEntryProps = {
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  diaryEntries: DiaryEntry[];
  notify: (message: ErrorMessage) => void;
};

export interface ValidationError {
  message: string | null;
  errors: Record<string, string[]>;
}

export interface ErrorMessage {
  errorMessage?: ValidationError | string | null;
}
