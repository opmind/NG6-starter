import angular from 'angular';
import Navbar from '../components/navbar/navbar';
import Hero from '../components/hero/hero';
import User from '../components/user/user';

let commonModule = angular.module('myApp.common', [
  Navbar,
  Hero,
  User
])

.name;

export default commonModule;
