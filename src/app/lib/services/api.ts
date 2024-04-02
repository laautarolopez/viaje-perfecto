type Methods = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

type ApiService = {
hostname: string;
pathname?: string;
method?: Methods;
query?: QueryString;
body?: Record<string, unknown>;
headers?: Record<string, unknown>;
};

type QueryString = Record<string, number | string | boolean | undefined>;

const composeQueryParams = (query?: QueryString) => {
if (!query) {
return "";
}

const parsedQuery = Object.keys(query).reduce((collector, key) => {
if (query[key] !== null) {
return {
...collector,
[key]: query[key],
};
}
return collector;
}, {});

return "?" + new URLSearchParams(parsedQuery).toString();
};

export async function apiService<T>({
hostname,
pathname,
query,
method = "GET",
body,
headers,
}: ApiService): Promise<T> {
const qString = composeQueryParams(query);

const path = `${hostname}/${pathname}${qString}`;

const options = {
method,
body: body ? JSON.stringify(body) : undefined,
headers: {
"Content-Type": "application/json",
...headers,
},
};

const response = await fetch(path, options);

const data = await response.json();
if (!response.ok) {
throw new Error(data.response.message);
}

return data as T;
}