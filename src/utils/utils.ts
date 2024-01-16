import { NavigateFunction } from 'react-router-dom';
import { Role } from '../types';
import { RouteDefinitions } from '../renderer/App';

export function enumNumericValues<T extends { [s: string]: any }>(enumObject: T): number[] {
  return Object.values(enumObject).filter((x) => typeof x === 'number');
}

export function getQueryParamValue(paramName: string) {
  const queryString = global.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(paramName);
}

export function navigateToStartPage(role: Role, navigate: NavigateFunction) {
  if (role == Role.Host) {
    navigate(RouteDefinitions.WelcomeHost, { replace: true });
  } else {
    navigate(RouteDefinitions.WelcomeTeam, { replace: true });
  }
}
