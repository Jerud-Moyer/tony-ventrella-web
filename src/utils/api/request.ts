type Method = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
type Body = {
  [k: string]: string
}


const request = async(path: string, method: Method, body?: Body) => {
  const res = await fetch(path, {
    method,
    headers: ['POST', 'PUT', 'PATCH'].includes(method)
      ? { 'Content-Type': 'application/json' }
      : {},
    credentials: 'include',
    body: ['POST', 'PUT', 'PATCH'].includes(method)
      ? JSON.stringify(body)
      : null
  });

  const json = await res.json();

  if(!res.ok) throw json;
  return json;
};

export const post = (path: string, body: Body) => request(path, 'POST', body);
export const get = (path: string) => request(path, 'GET');
export const put = (path: string, body: Body) => request(path, 'PUT', body);
export const del = (path: string) => request(path, 'DELETE');
