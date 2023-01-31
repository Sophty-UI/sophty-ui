import { jsx } from 'react/jsx-runtime';

const GridItem = ({ children, style, columnStart, columnEnd, span, ...props }) => {
    if (typeof span !== 'number' || typeof columnStart !== 'number' || typeof columnEnd !== 'number') {
        throw new Error('Use Grid.Item only inside Grid container');
    }
    return (jsx("div", { ...props, style: { ...style, gridColumn: `${columnStart} / ${Math.min(columnStart + span, columnEnd + 1)}` }, children: children }));
};

export { GridItem as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZEl0ZW0uanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2xheW91dHMvR3JpZC9wYXJ0cy9HcmlkSXRlbS50c3giXSwic291cmNlc0NvbnRlbnQiOltudWxsXSwibmFtZXMiOlsiX2pzeCJdLCJtYXBwaW5ncyI6Ijs7QUFXQSxNQUFNLFFBQVEsR0FBRyxDQUFDLEVBQ2hCLFFBQVEsRUFDUixLQUFLLEVBQ0wsV0FBVyxFQUNYLFNBQVMsRUFDVCxJQUFJLEVBQ0osR0FBRyxLQUFLLEVBQ08sS0FBa0M7QUFDakQsSUFBQSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFO0FBQ2hHLFFBQUEsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0FBQzdELEtBQUE7QUFFRCxJQUFBLFFBQ0VBLEdBQUEsQ0FBQSxLQUFBLEVBQUEsRUFBQSxHQUFTLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQSxFQUFHLFdBQVcsQ0FBTSxHQUFBLEVBQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUEsUUFBQSxFQUMvRyxRQUFRLEVBQUEsQ0FDTCxFQUNOO0FBQ0o7Ozs7In0=
