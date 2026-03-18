
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;
    resolve({ data });
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      });
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      if (response.ok) {
        resolve({ data });
      } else {
        reject(data);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/check');
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      if (response.ok) {
        resolve({ data });
      } else {
        reject(data);
      }
    } catch (error) {
      reject(error);
    }
  });
}


export function signOut(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/logout');
      if (response.ok) {
        resolve({ data:'success' });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      console.log(error)
      reject( error );
    }
  });
}


export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/reset-password-request', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'content-type': 'application/json' },
      });
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      if (response.ok) {
        resolve({ data });
      } else {
        reject(data);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
      });
      const text = await response.text();
      const parsed = text ? JSON.parse(text) : null;
      if (response.ok) {
        resolve({ data: parsed });
      } else {
        reject(parsed);
      }
    } catch (error) {
      reject(error);
    }
  });
}
