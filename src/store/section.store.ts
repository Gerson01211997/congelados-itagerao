"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

export type SectionId = string;

interface SectionState {
  selectedSectionId: SectionId | null;
  selectSection: (sectionId: SectionId) => void;
  deselectSection: () => void;
  toggleSection: (sectionId: SectionId) => void;
  resetSelection: () => void;
  isSelected: (sectionId: SectionId) => boolean;
}

const initialState: Pick<SectionState, "selectedSectionId"> = {
  selectedSectionId: null,
};

export const useSectionStore = create<SectionState>()(
  persist(
    (set, get) => ({
      ...initialState,
      selectSection: (sectionId) => set({ selectedSectionId: sectionId }),
      deselectSection: () => set({ ...initialState }),
      toggleSection: (sectionId) =>
        set((state) => ({
          selectedSectionId:
            state.selectedSectionId === sectionId ? null : sectionId,
        })),
      resetSelection: () => set({ ...initialState }),
      isSelected: (sectionId) => get().selectedSectionId === sectionId,
    }),
    {
      name: "section-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// Selectores especializados para evitar re-renders globales

export const useSelectedSectionId = () =>
  useSectionStore((state) => state.selectedSectionId);

export const useIsSectionSelected = (sectionId: SectionId) =>
  useSectionStore((state) => state.selectedSectionId === sectionId);

export const useSectionActions = () =>
  useStoreWithEqualityFn(
    useSectionStore,
    (state) => ({
      selectSection: state.selectSection,
      deselectSection: state.deselectSection,
      toggleSection: state.toggleSection,
      resetSelection: state.resetSelection,
    }),
    shallow,
  );
