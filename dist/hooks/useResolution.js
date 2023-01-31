import { useMemo } from 'react';
import { Resolution } from '../types/resolution.js';
import useMediaQuery from './useMediaQuery.js';

function useResolution() {
    const isSuperLarge = useMediaQuery(({ breakpoints }) => breakpoints.up(Resolution.SuperLarge));
    const isExtraLarge = useMediaQuery(({ breakpoints }) => breakpoints.up(Resolution.ExtraLarge));
    const isLarge = useMediaQuery(({ breakpoints }) => breakpoints.up(Resolution.Large));
    const isMedium = useMediaQuery(({ breakpoints }) => breakpoints.up(Resolution.Medium));
    const isSmall = useMediaQuery(({ breakpoints }) => breakpoints.up(Resolution.Small));
    const resolution = useMemo(() => [
        isSuperLarge && Resolution.SuperLarge,
        isExtraLarge && Resolution.ExtraLarge,
        isLarge && Resolution.Large,
        isMedium && Resolution.Medium,
        isSmall && Resolution.Small,
    ].find(value => !!value) || Resolution.ExtraSmall, [isSuperLarge, isExtraLarge, isLarge, isMedium, isSmall]);
    return resolution;
}

export { useResolution as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlUmVzb2x1dGlvbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hvb2tzL3VzZVJlc29sdXRpb24udHMiXSwic291cmNlc0NvbnRlbnQiOltudWxsXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtBLFNBQVMsYUFBYSxHQUFBO0lBQ3BCLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssV0FBVyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUMvRixNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxLQUFLLFdBQVcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDL0YsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsS0FBSyxXQUFXLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLE1BQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssV0FBVyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN2RixNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxLQUFLLFdBQVcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDckYsSUFBQSxNQUFNLFVBQVUsR0FBZSxPQUFPLENBQ3BDLE1BQ0U7UUFDRSxZQUFZLElBQUksVUFBVSxDQUFDLFVBQVU7UUFDckMsWUFBWSxJQUFJLFVBQVUsQ0FBQyxVQUFVO1FBQ3JDLE9BQU8sSUFBSSxVQUFVLENBQUMsS0FBSztRQUMzQixRQUFRLElBQUksVUFBVSxDQUFDLE1BQU07UUFDN0IsT0FBTyxJQUFJLFVBQVUsQ0FBQyxLQUFLO0tBQzVCLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksVUFBVSxDQUFDLFVBQVUsRUFDbkQsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQ3pELENBQUM7QUFFRixJQUFBLE9BQU8sVUFBVSxDQUFDO0FBQ3BCOzs7OyJ9
