import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Map } from "leaflet";
import { Menu } from "./Menu";
import { Search } from "./Search";
import { Attribute } from "../Generator";
import { initMap } from "../initMap";
import { useTranslation } from "react-i18next";
import { Filter } from "./Filters";

let initalized = false;
type Props<M> = {
  baseUrl: string;
  filterOptions: {
    id: number;
    group: string;
    subgroup?: string;
    order?: number;
    value: string;
    icon: string;
    button?: string;
    query: string;
    color: string;
    edit: string[];
    tags: string[];
  }[];
  attributes: Attribute<M>[];
  info: Filter | undefined;
  globalFilter?: (tags: any, group: any, value: any) => boolean;
  minZoom?: number;
  offers: string[];
  onAbout: () => void;
  onLoaded: (map: Map) => void;
};

export function Init<M>({
  onLoaded,
  baseUrl,
  filterOptions,
  attributes,
  globalFilter,
  minZoom = 14,
  offers,
}: Props<M>) {
  let { t } = useTranslation();
  const map = useMap();

  useEffect(() => {
    if (!initalized) {
      onLoaded(map);
      initMap(
        baseUrl,
        filterOptions,
        attributes,
        map,
        t,
        globalFilter,
        minZoom,
        offers
      );
    }
    initalized = true;
  });

  return null;
}

export function OsmMapContainer<M>(props: Props<M>) {
  return (
    <MapContainer id="map">
      <TileLayer
        opacity={0.7}
        attribution='Map data &copy; <a href="https://openstreetmap.org/">OpenStreetMap</a> | POI via <a href="https://www.overpass-api.de/">Overpass</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Init {...props} />
      <Menu
        filterOptions={props.filterOptions}
        offers={props.offers}
        onAbout={props.onAbout}
      />
      <Search />
    </MapContainer>
  );
}
