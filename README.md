# Substracer - Interactive Substrate Simulator

<p align="center">
  <img style="border-radius: 10px !important; overflow: hidden;" src="https://github.com/lowlevelers/substracer/assets/56880684/472601f5-358f-4fd8-88b5-103f5c5f6345"/>
</p>

## Description

Simulate the substrate network in an interactive graphical interface.

- Run a virtual Substrate node directly on the browser
- Configure pallets and chain specification interactively
- Tracing the peer-to-peer network behavior

## Motivation

One of the biggest obstacles to diving deeper into the Polkadot blockchain is the limitation of hardware requirements and lack of interactive approaches. The learning curve is huge to start with the Polkadot core technologies and requires much time to read the documentation. Inspired by this [thread](https://forum.polkadot.network/t/9-ideas-for-the-decentralized-future-of-polkadot/4731) on Polkadot forum, there is no unified approach for DevRel to widespread the value of the whole Polkadot ecosystem.

Hence, we feel like the community needs a more creative solution to the stated problem. With experience in traditional networking software, the `Cisco Packet Tracker` is a tool hugely inspires the birth of the `Substrate Simulator`.

## Development Milestone

### 🔴 Version 0.0.1

To deliver the first version of the product, we must customize the runtime (`/runtime`) so it can communicate with the web server (`/server`) and pass data accross services. Hence, we can simulate the behaviour of the production runtime by using the web server as the networking and computation layer.

- [ ] Drag and drop editor to add Substrate node
- [ ] Add / edit chain specification directly on browser
- [ ] Simulate the behaviors of Substrate node

Running a new node will store node in the EdgeDB database with ability to configure chain specification and authority on the client side. Node will be run at the virtual port simulated in the simulation environment.

- [ ] Simulate node discovery mechanism

This feature allows a visualization of the request transmitting in the network to break down the mechanism of `Substrate's node discovery`.

## CHANGELOG

### 6-12-2023

- fix queryable trait by adding uuid to model (`@chungquantin`)
- add edgedb and controller for keypair (`@chungquantin`)

### 5-12-2023

- add key controller to generate (`@chungquantin`)
- impl node typed builder (`@chungquantin`)
- add development config, chain spec json parse (`@chungquantin`)
- add structure and api for chain_spec (`@chungquantin`)

### 4-12-2023

- add balance pallet and server config (`@chungquantin`)
- fork and simplify the runtime (`@chungquantin`)

### 17-12-2023

- ui: add a simple canvas edtior ui and add node modal (`@chungquantin`)
- research `netsim` and `zombienet` , we can fork the source code of one of these projects to simulate the simple network. `netsim` is written in Rust and it simulates the basic network with router, switch, udp, ws so it is likable while `zombienet` is more like a wrapper which use `exca` to spawn child process and run node as subprocess.
  <img width="1512" alt="Screenshot 2023-12-17 at 00 37 27" src="https://github.com/lowlevelers/substrate-simulator/assets/56880684/26152fce-cf75-4e34-b550-2eb66bcc588e">

### 18-12-2023

After learning about `zombienet` and `netsim` approach, if we apply the design of `zombienet` for Substracer, we need to refractor the runtime to add custom logger overriding the existing runtime logger so it can stream the data of node back to Substracer backend. However, this still use a local testing environment not a simulated environment. Hence, it's hard if we want to spawn >10 daemons just for testing. But the benefit is we don't have to worry much about the underlying networking protocol built on top of `libp2p`.

With `netsim`, it gives us the ability to simulate the simple network but there is not way to integrate it with `libp2p`. Hence, we need to mock `libp2p` code and build a simpler version to support the simulation.

### 23-12-2023

- Add `sc_network` crate to the project so we can reuse modules
- rewrite the type of node id to support the original `PeerId` from `sc_network` crate
- Add new type `NetworkPort` to support the `SocketV4Addr`
  Next thing is to have an entity manager that manage the existing nodes and network config, when the state changes (add new node, update network state) => entity is changed. New node added to the network must declare the `ip_address` and `ws_port`. Then, single node instance will be started and start discovering other nodes to construct the P2P network. Can reference from the way node discoveries work in Bit Torrent: https://www.youtube.com/watch?v=jf_ddGnum_4
