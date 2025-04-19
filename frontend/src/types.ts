// frontend/src/types.ts

// --- API Schemas ---

export interface CycleStats {
    average_length: number | null;
    count: number; // OpenAPI says integer, number is sufficient in TS/JS
    max_length: number | null; // OpenAPI says integer
    min_length: number | null; // OpenAPI says integer
}

export interface HTTPError {
    detail: any; // Can be complex, use any for simplicity unless structured
    message: string;
}

export interface Login {
    login: string;
    password: string;
}

export interface Period {
    created_at: string; // date-time format
    duration: number | null; // integer, nullable when end_date is null
    end_date: string | null; // date format, nullable
    id: number; // integer
    start_date: string; // date format
    user_id: number; // integer
}

export interface PeriodCreate {
    start_date: string; // date format
}

export interface PeriodStats {
    average_duration: number | null;
    count: number; // integer
    max_duration: number | null; // integer
    min_duration: number | null; // integer
}

export interface PeriodUpdate {
    end_date: string; // date format
}

export interface Token {
    access_token: string;
}

export interface User {
    created_at: string; // date-time format
    email: string;
    id: number; // integer
    username: string;
}

export interface UserRegistration {
    confirm_password: string;
    email: string;
    password: string;
    username: string;
}

export interface ValidationError {
    message: string;
    // Detail can be complex. Representing as a record of strings to string arrays
    // based on the example, but it could vary. 'any' is also an option.
    detail: Record<string, string | string[] | Record<string, string[]>>;
    // A simpler approach for detail might be just 'any' if you don't need
    // structured access to validation errors everywhere.
    // detail: any;
}


// --- Pinia Store Types ---

export interface AuthState {
    token: string | null;
    user: User | null; // Assuming you might fetch user details later
    loading: boolean;
    error: string | null;
}

export interface AuthGetters {
    isAuthenticated: (state: AuthState) => boolean;
}

export interface AuthActions {
    login(credentials: Login): Promise<void>;
    register(userData: UserRegistration): Promise<void>;
    logout(): void;
    initializeAuth(): void;
    // fetchUser(): Promise<void>; // If you add a fetch user action
}


export interface PeriodsState {
    periods: Period[];
    periodStats: PeriodStats | null;
    cycleStats: CycleStats | null;
    loading: boolean;
    error: string | null;
    pagination: {
        page: number;
        per_page: number;
        total: number;
    };
}

export interface PeriodsGetters {
    // Add getters here if needed, e.g., sortedPeriods
}

export interface PeriodsActions {
    fetchPeriods(page?: number, per_page?: number): Promise<void>;
    createPeriod(startDate: string): Promise<void>; // Expects date string
    updatePeriod(periodId: number, endDate: string): Promise<void>; // Expects date string
    deletePeriod(periodId: number): Promise<void>;
    fetchPeriodStats(): Promise<void>;
    fetchCycleStats(): Promise<void>;
}