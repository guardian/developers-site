"format cjs";
// Copyright Joyent, Inc. and other Node contributors.
var Stream=require("./stream");module.exports=Stream,Stream.Readable=require('./readable'),Stream.Writable=require('./writable'),Stream.Duplex=require('./duplex'),Stream.Transform=require('./transform'),Stream.PassThrough=require('./passthrough');