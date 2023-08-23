import mapKeys from 'lodash/mapKeys';
import camelCase from 'lodash/camelCase';

export function parseToCamelCase(data) {
    data = mapKeys(data, (value, key) => camelCase(key));
    return data;
}
