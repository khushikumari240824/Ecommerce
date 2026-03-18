
async function handleResponse(response) {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData?.message) {
        message = errorData.message;
      }
    } catch {
    }
    throw new Error(message);
  }

  return response.json();
}

export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/products/' + id);
      const data = await handleResponse(response);
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function createProduct(product) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/products/', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: { 'content-type': 'application/json' },
      });
      const data = await handleResponse(response);
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/products/' + update.id, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      });
      const data = await handleResponse(response);
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchProductsByFilters(filter, sort, pagination, admin) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}

  const params = new URLSearchParams();

  for (let key in filter) {
    const values = filter[key];
    if (Array.isArray(values) && values.length) {
      values.forEach((value) => params.append(key, value));
    }
  }

  for (let key in sort) {
    params.set(key, sort[key]);
  }

  for (let key in pagination) {
    params.set(key, pagination[key]);
  }
  if (admin) {
    params.set('admin', 'true');
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/products?' + params.toString());
      const data = await handleResponse(response);
      const totalItems = response.headers.get('X-Total-Count');
      resolve({ data: { products: data, totalItems: +(totalItems ?? 0) } });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchCategories() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/categories');
      const data = await handleResponse(response);
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchBrands() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/brands');
      const data = await handleResponse(response);
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}
