function test(){
    var i = 0
    try {
        i ++;
        throw new Error("a");
        // eslint-disable-next-line no-unreachable
        return i++;
    }catch (e) {
        i ++;
        return i++;
    } finally {
        // eslint-disable-next-line no-unsafe-finally
        return i++;
    }
}

console.log(test())

function square(num) {
    total = num * num;
    return total;
}

var total = 50;
var number = square(total);
console.log(number)