a=33
b=1
c=5
d=26


// [AAA] = 1 
// [AAB] = 2
// [AAZ] = 26 26=Z, 1=A , 27=A | (num/26)%26

// [ABA] = []





function generateCustomerId(index) {

    rem = Math.floor(index/26) + index%26 -1;
    console.log("a", rem)
    console.log("b", rem)
    console.log("c", rem)

    z=1 + index%26;
    y=1+ index%52;
    x=1+  index%78;
    
    console.log("index:", index," | x",x,"y", y,"z", z)
    let id = '';
    let num = Math.floor(index / 26);
    let remainder = index % 26;
  
    // id += String.fromCharCode(64 + x);
    // id += String.fromCharCode(64 + y);
    // id += String.fromCharCode(64 +z);
  
    return id;
  }


  console.log(generateCustomerId(a))
  console.log(generateCustomerId(b))
  console.log(generateCustomerId(c))
  console.log(generateCustomerId(d))