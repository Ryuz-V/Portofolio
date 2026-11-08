"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "./QuickSearch.module.css";
import { searchItems, SearchItem } from "./searchData";

// ─── HELPER: HIGHLIGHT MATCHED TEXT ──────────────────────────────────────────
function highlightMatches(text: string, query: string): React.ReactNode {
  const trimmed = query.trim();
  if (!trimmed) return text;

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className={styles.highlight}>
        {part}
      </mark>
    ) : (
      part
    )
  );
}

// ─── HELPER: EXTRACT CONTEXTUAL SNIPPET ────────────────────────────────────────
function getSnippet(content: string, query: string): string {
  const trimmed = query.trim();
  if (!trimmed) {
    return content.length > 115 ? content.slice(0, 115) + "..." : content;
  }

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escaped, "i");
  const match = regex.exec(content);

  if (!match) {
    return content.length > 115 ? content.slice(0, 115) + "..." : content;
  }

  const matchIndex = match.index;
  const start = Math.max(0, matchIndex - 35);
  const end = Math.min(content.length, matchIndex + trimmed.length + 80);

  let snippet = content.slice(start, end);
  if (start > 0) snippet = "..." + snippet;
  if (end < content.length) snippet = snippet + "...";

  return snippet;
}

export default function QuickSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Shortcut Ctrl + K or Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close dropdown (without dark backdrop)
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Filter items across all categories ONLY when query is typed
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return [];
    }
    return searchItems.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(q);
      const subMatch = item.subtitle ? item.subtitle.toLowerCase().includes(q) : false;
      const contentMatch = item.content.toLowerCase().includes(q);
      const catMatch = item.category.toLowerCase().includes(q);
      return titleMatch || subMatch || contentMatch || catMatch;
    });
  }, [query]);

  // Reset active index when items change
  useEffect(() => {
    setActiveIndex(0);
  }, [filteredItems]);

  const handleSelect = (item: SearchItem) => {
    setIsOpen(false);
    inputRef.current?.blur();
    router.push(item.url);
  };

  // Keyboard navigation inside dropdown
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
      } else if (e.key === "ArrowDown" && filteredItems.length > 0) {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1 < filteredItems.length ? prev + 1 : 0));
      } else if (e.key === "ArrowUp" && filteredItems.length > 0) {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === "Enter" && filteredItems.length > 0) {
        e.preventDefault();
        handleSelect(filteredItems[activeIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, activeIndex]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current && filteredItems.length > 0) {
      const activeEl = listRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [activeIndex, filteredItems]);

  const hasTyped = query.trim().length > 0;

  return (
    <div
      ref={wrapperRef}
      className={`${styles.searchWrapper} ${isOpen ? styles.wrapperActive : ""}`}
    >
      {/* ── THE NAVBAR SEARCH INPUT BAR ── */}
      <div
        className={`${styles.searchBox} ${isOpen ? styles.searchBoxActive : ""}`}
        onClick={() => {
          inputRef.current?.focus();
          setIsOpen(true);
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.searchIcon}
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Quick search..."
          className={styles.searchInput}
        />

        {query && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={(e) => {
              e.stopPropagation();
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear query"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}

        <div className={styles.shortcutKey}>
          <kbd>Ctrl</kbd> <kbd>K</kbd>
        </div>
      </div>

      {/* ── DROPDOWN HASIL (Tanpa backdrop hitam) ── */}
      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.resultsList} ref={listRef}>
            {!hasTyped ? (
              /* Pas awal search: hanya prompt bersih tanpa suggested */
              <div className={styles.emptyState}>
                <p className={styles.emptyText}>Start typing to search...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className={styles.emptyState}>
                <svg
                  className={styles.emptyIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className={styles.emptyText}>No results found for &ldquo;{query}&rdquo;</p>
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const isActive = index === activeIndex;
                const snippetText = getSnippet(item.content, query);

                return (
                  <div
                    key={item.id}
                    className={`${styles.resultCard} ${isActive ? styles.active : ""}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <div className={styles.cardHeader}>
                      <div className={styles.cardTitleGroup}>
                        {item.iconType === "page" ? (
                          <span className={styles.itemIcon}>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              width="14"
                              height="14"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                              <line x1="16" y1="13" x2="8" y2="13" />
                              <line x1="16" y1="17" x2="8" y2="17" />
                              <polyline points="10 9 9 9 8 9" />
                            </svg>
                          </span>
                        ) : (
                          <span className={`${styles.itemIcon} ${styles.hashIcon}`}>#</span>
                        )}
                        <span className={styles.cardTitle}>
                          {highlightMatches(item.title, query)}
                        </span>
                      </div>
                      <span className={styles.categoryBadge}>{item.category}</span>
                    </div>

                    <div className={styles.cardSnippet}>
                      {highlightMatches(snippetText, query)}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Footer Shortcuts */}
          <div className={styles.footer}>
            <div className={styles.shortcuts}>
              <span className={styles.shortcutItem}>
                <kbd>↑</kbd> <kbd>↓</kbd> navigate
              </span>
              <span className={styles.shortcutItem}>
                <kbd>↵</kbd> select
              </span>
              <span className={styles.shortcutItem}>
                <kbd>esc</kbd> close
              </span>
            </div>
            {hasTyped && (
              <span className={styles.resultsCount}>
                {filteredItems.length} {filteredItems.length === 1 ? "result" : "results"}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
