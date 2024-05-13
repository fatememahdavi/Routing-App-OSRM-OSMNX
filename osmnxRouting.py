import json
import sys

import numpy as np
import osmnx as ox
from osmnx.utils_graph import graph_to_gdfs

np.random.seed(0)


def routing(locations):

    G = ox.load_graphml("Montreal_Network.graphml")

    hwy_speeds = {"residential": 35, "secondary": 50, "tertiary": 60}
    G = ox.add_edge_speeds(G, hwy_speeds)
    G = ox.add_edge_travel_times(G)

    origin_node = ox.distance.nearest_nodes(G, locations[0], locations[1])
    destination_node = ox.distance.nearest_nodes(G, locations[2], locations[3])

    route = ox.shortest_path(G, origin_node, destination_node, weight="travel_time", cpus=None)

    gdf_nodes, gdf_edges = graph_to_gdfs(G)
    node_coordinates = {node: [gdf_nodes.loc[node]['y'], gdf_nodes.loc[node]['x']] for node in route}
    route_coordinates = [node_coordinates[node] for node in route]

    return route_coordinates


def read_in():
    args = sys.argv[1:]
    parsed_args = json.loads(args[0])
    locations = parsed_args

    origin_lng = float(locations[0])
    origin_lat = float(locations[1])
    destination_lng = float(locations[2])
    destination_lat = float(locations[3])

    return [origin_lng, origin_lat, destination_lng, destination_lat]


def main():
    loctions = read_in()
    res = routing(loctions)
    print(json.dumps(res))


if __name__ == '__main__':
    main()
