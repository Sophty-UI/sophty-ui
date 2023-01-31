import breakpoints from './variables/_breakpoints.module.scss.js';

const BREAKPOINT_SUBTRACT = 0.02;
const theme = {
    breakpoints: {
        ...breakpoints,
        up(breakpoint) {
            return `(min-width: ${breakpoints[breakpoint] ?? '0'})`;
        },
        down(breakpoint) {
            return `(max-width: ${parseFloat(breakpoints[breakpoint] ?? '0') - BREAKPOINT_SUBTRACT}px)`;
        },
        between(a, b) {
            return `${this.up(a)} and ${this.down(b)}`;
        },
    },
};

export { theme as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aGVtZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0FBRWpDLE1BQU0sS0FBSyxHQUFHO0FBQ1osSUFBQSxXQUFXLEVBQUU7QUFDWCxRQUFBLEdBQUcsV0FBVztBQUNkLFFBQUEsRUFBRSxDQUFDLFVBQW9DLEVBQUE7WUFDckMsT0FBTyxDQUFBLFlBQUEsRUFBZSxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7U0FDekQ7QUFDRCxRQUFBLElBQUksQ0FBQyxVQUFvQyxFQUFBO0FBQ3ZDLFlBQUEsT0FBTyxDQUFlLFlBQUEsRUFBQSxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLG1CQUFtQixLQUFLLENBQUM7U0FDN0Y7UUFDRCxPQUFPLENBQUMsQ0FBMkIsRUFBRSxDQUEyQixFQUFBO0FBQzlELFlBQUEsT0FBTyxDQUFHLEVBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBUSxLQUFBLEVBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQzVDO0FBQ0YsS0FBQTs7Ozs7In0=
