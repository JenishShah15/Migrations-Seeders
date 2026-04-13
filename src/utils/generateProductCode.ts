

export function generateProductCode(n,bn):string{

    let concatname = n.concat(bn);
    let splitname = concatname.split(' ');
    let prodcode = splitname.filter(char => char!= '');
    let productcode = prodcode.reduce((acc,char) => {
      return acc+char
    },'').toLowerCase();
    console.log(productcode);
    


    return productcode;
  }