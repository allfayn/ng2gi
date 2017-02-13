import {QueryEncoder} from '@angular/http';

export class CustomQueryEncoder extends QueryEncoder {
  encodeKey(k: string): string {
    return this.encode(k);
  }

  encodeValue(v: string): string {
    return this.encode(v);
  }

  private encode(v: string): string {
    return encodeURIComponent(v)
      .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/gi, '$')
      .replace(/%2C/gi, ',')
      .replace(/%3B/gi, ';')
      //.replace(/%2B/gi, '+')
      .replace(/%3D/gi, ';')
      .replace(/%3F/gi, '?')
      .replace(/%2F/gi, '/');
  }
}
