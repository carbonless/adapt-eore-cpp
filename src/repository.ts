import {seed,State} from './domain';
const KEY='adapt-eore-cpp-v1';
export const repository={load():State{try{const raw=localStorage.getItem(KEY);return raw?JSON.parse(raw):seed();}catch{return seed();}},save(s:State){localStorage.setItem(KEY,JSON.stringify(s));}};
