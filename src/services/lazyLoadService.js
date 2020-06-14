export class LazyLoadService {
  loaded = new Set();

  loadScript({ src, id }) {
    return new Promise((resolve) => {
      if (this.loaded.has(src)) resolve(false);
      const element = document.createElement('script');
      element.src = src;
      element.id = id;

      element.onload = () => {
        this.loaded.add(src);
        resolve(true);
      };
      document.body.appendChild(element);
    });
  }
}
