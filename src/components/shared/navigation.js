export const NavigationManager = {
    history: [],
  
    push(path) {
      this.history.push(path);
      localStorage.setItem('navigationHistory', JSON.stringify(this.history));
    },
  
    pop() {
      const path = this.history.pop();
      localStorage.setItem('navigationHistory', JSON.stringify(this.history));
      return path;
    },
  
    init() {
      const saved = localStorage.getItem('navigationHistory');
      this.history = saved ? JSON.parse(saved) : [];
    },
  
    clear() {
      this.history = [];
      localStorage.removeItem('navigationHistory');
    }
  };
  