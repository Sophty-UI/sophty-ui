import { jsx } from 'react/jsx-runtime';

const Area = ({ area, height, width, children, style = {}, semantic = 'div', ...props }) => {
    const Tag = `${semantic}`;
    return (jsx(Tag, { ...props, style: {
            ...style,
            gridArea: area,
            display: 'inline-grid',
            width: typeof width === 'number' ? width : undefined,
            height: typeof height === 'number' ? height : undefined,
        }, children: children }));
};

export { Area as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJlYS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvbGF5b3V0cy9MYXlvdXQvcGFydHMvQXJlYS50c3giXSwic291cmNlc0NvbnRlbnQiOltudWxsXSwibmFtZXMiOlsiX2pzeCJdLCJtYXBwaW5ncyI6Ijs7QUFhTSxNQUFBLElBQUksR0FBRyxDQUFDLEVBQ1osSUFBSSxFQUNKLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLEtBQUssR0FBRyxFQUFFLEVBQ1YsUUFBUSxHQUFHLEtBQUssRUFDaEIsR0FBRyxLQUFLLEVBQ0csS0FBOEI7QUFDekMsSUFBQSxNQUFNLEdBQUcsR0FBRyxDQUFHLEVBQUEsUUFBUSxFQUFxQixDQUFDO0FBRTdDLElBQUEsUUFDRUEsR0FBQyxDQUFBLEdBQUcsT0FDRSxLQUFLLEVBQ1QsS0FBSyxFQUFFO0FBQ0wsWUFBQSxHQUFHLEtBQUs7QUFDUixZQUFBLFFBQVEsRUFBRSxJQUFJO0FBQ2QsWUFBQSxPQUFPLEVBQUUsYUFBYTtBQUN0QixZQUFBLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxRQUFRLEdBQUcsS0FBSyxHQUFHLFNBQVM7QUFDcEQsWUFBQSxNQUFNLEVBQUUsT0FBTyxNQUFNLEtBQUssUUFBUSxHQUFHLE1BQU0sR0FBRyxTQUFTO1NBQ3hELEVBRUEsUUFBQSxFQUFBLFFBQVEsRUFDTCxDQUFBLEVBQ047QUFDSjs7OzsifQ==
