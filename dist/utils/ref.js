const composeRef = (...refs) => {
    const refList = refs.filter(ref => ref);
    const callback = (node) => {
        refs.forEach(ref => {
            if (typeof ref === 'function') {
                ref(node);
            }
            else if (typeof ref === 'object' && ref && 'current' in ref) {
                ref.current = node;
            }
        });
    };
    return refList.length <= 1 ? refList[0] ?? null : callback;
};

export { composeRef };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvcmVmLnRzIl0sInNvdXJjZXNDb250ZW50IjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJNQUVhLFVBQVUsR0FBRyxDQUFJLEdBQUcsSUFBYyxLQUFZO0FBQ3pELElBQUEsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7QUFDeEMsSUFBQSxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQU8sS0FBVTtBQUNqQyxRQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFHO0FBQ2pCLFlBQUEsSUFBSSxPQUFPLEdBQUcsS0FBSyxVQUFVLEVBQUU7Z0JBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNYLGFBQUE7aUJBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxJQUFJLFNBQVMsSUFBSSxHQUFHLEVBQUU7QUFDNUQsZ0JBQUEsR0FBc0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3hDLGFBQUE7QUFDSCxTQUFDLENBQUMsQ0FBQztBQUNMLEtBQUMsQ0FBQztBQUVGLElBQUEsT0FBTyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQztBQUM3RDs7OzsifQ==
