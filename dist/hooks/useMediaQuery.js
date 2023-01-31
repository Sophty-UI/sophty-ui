import { useState, useEffect } from 'react';
import useTheme from './useTheme.js';

function useMediaQuery(query) {
    const getMatch = () => window.matchMedia(typeof query === 'function' ? query(theme) : query);
    const theme = useTheme();
    const [match, setMatch] = useState(getMatch().matches);
    const handleChange = () => setMatch(getMatch().matches);
    useEffect(() => {
        const matchMedia = getMatch();
        matchMedia.addEventListener('change', handleChange);
        return () => matchMedia.removeEventListener('change', handleChange);
    }, [query]);
    return match;
}

export { useMediaQuery as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlTWVkaWFRdWVyeS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hvb2tzL3VzZU1lZGlhUXVlcnkudHMiXSwic291cmNlc0NvbnRlbnQiOltudWxsXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EsU0FBUyxhQUFhLENBQUMsS0FBMkMsRUFBQTtJQUNoRSxNQUFNLFFBQVEsR0FBRyxNQUFzQixNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sS0FBSyxLQUFLLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDN0csSUFBQSxNQUFNLEtBQUssR0FBRyxRQUFRLEVBQUUsQ0FBQztBQUN6QixJQUFBLE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRXZELElBQUEsTUFBTSxZQUFZLEdBQUcsTUFBWSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFOUQsU0FBUyxDQUFDLE1BQUs7QUFDYixRQUFBLE1BQU0sVUFBVSxHQUFHLFFBQVEsRUFBRSxDQUFDO0FBRTlCLFFBQUEsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUVwRCxPQUFPLE1BQU0sVUFBVSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUN0RSxLQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBRVosSUFBQSxPQUFPLEtBQUssQ0FBQztBQUNmOzs7OyJ9
