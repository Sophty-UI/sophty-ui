import { jsx } from 'react/jsx-runtime';
import clsx from 'clsx';
import { useState, useCallback } from 'react';
import MenuItem from './parts/Item/MenuItem.js';
import styles from './style.module.scss.js';

const Menu = ({ selectedId, className, items, onSelect, mode = 'horizontal', ...props }) => {
    const [selected, setSelected] = useState(selectedId);
    const handleClick = useCallback((event, id) => {
        setSelected(id);
        if (onSelect)
            onSelect(id, event);
    }, [items]);
    return (jsx("ul", { ...props, className: clsx(className, styles.menu, styles[mode]), children: items.map(item => (jsx(MenuItem, { ...item, selected: selected === item.id, onClick: handleClick }, item.id))) }));
};

export { Menu as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvc3RydWN0dXJlcy9NZW51L01lbnUudHN4Il0sInNvdXJjZXNDb250ZW50IjpbbnVsbF0sIm5hbWVzIjpbIl9qc3giXSwibWFwcGluZ3MiOiI7Ozs7OztBQWlCTSxNQUFBLElBQUksR0FBRyxDQUFDLEVBQ1osVUFBVSxFQUNWLFNBQVMsRUFDVCxLQUFLLEVBQ0wsUUFBUSxFQUNSLElBQUksR0FBRyxZQUFZLEVBQ25CLEdBQUcsS0FBSyxFQUNHLEtBQThCO0lBQ3pDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFxQixVQUFVLENBQUMsQ0FBQztJQUV6RSxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQzdCLENBQUMsS0FBZ0MsRUFBRSxFQUFVLEtBQUk7UUFDL0MsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRWhCLFFBQUEsSUFBSSxRQUFRO0FBQUUsWUFBQSxRQUFRLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3BDLEtBQUMsRUFDRCxDQUFDLEtBQUssQ0FBQyxDQUNSLENBQUM7SUFFRixRQUNFQSxHQUFRLENBQUEsSUFBQSxFQUFBLEVBQUEsR0FBQSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDakUsUUFBQSxFQUFBLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUNiQSxHQUFBLENBQUMsUUFBUSxFQUFBLEVBQUEsR0FBbUIsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFBLEVBQXZFLElBQUksQ0FBQyxFQUFFLENBQW9FLENBQzNGLENBQUMsRUFDQyxDQUFBLEVBQ0w7QUFDSjs7OzsifQ==
