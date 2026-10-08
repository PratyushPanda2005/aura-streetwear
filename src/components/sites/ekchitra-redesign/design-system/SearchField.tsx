import { cn } from "@/lib/utils";

import { FONT } from "./tokens";

type SearchFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  /** Accessible name for the submit button, e.g. "Search artworks". */
  submitLabel: string;
  className?: string;
};

/** Wide grey search field with a square submit button. Filters as you type. */
export function SearchField({
  id,
  value,
  onChange,
  placeholder,
  submitLabel,
  className,
}: SearchFieldProps) {
  return (
    <form
      role="search"
      onSubmit={(event) => event.preventDefault()}
      className={cn("flex", FONT.sans, className)}
    >
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="h-14 min-w-0 flex-1 rounded-l-[2px] border border-transparent bg-[#f3f3f3] px-[15px] text-[17px] leading-7 tracking-[0.17px] text-(--ek-ink) transition-colors duration-150 ease-in-out outline-none placeholder:text-[#767676] focus:border-(--ek-ink) focus:bg-(--ek-paper) [&::-webkit-search-cancel-button]:appearance-none"
      />
      <button
        type="submit"
        aria-label={submitLabel}
        className="flex size-14 shrink-0 items-center justify-center rounded-r-[2px] bg-[#767676] text-(--ek-paper) transition-colors duration-150 ease-in-out hover:bg-(--ek-ink)"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
          <circle
            cx="10.5"
            cy="10.5"
            r="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M15 15l5 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </form>
  );
}
