// 该链表使用dummyHead方式实现：
// 1. dummyHead为虚拟头节点，目的是为了让头节点和其他节点共用相同的方法
// 2. dummyHead初始化的时候数据应为null
// 3. dummyHead在链表的实现中会占据index为0的位置，所以使用者获取到链表头在链表中实际index为1；用户不需要在意类里面的具体实现，只需要保证获取实际get(index=0)为头节点就行。
// 4. 链表中没有索引的概念，无法直接通过索引取值，因此需要通过遍历查找，由于dummyHead的存在，查找到的index节点的next才是用户实际想要的。即用户存入的数据在链表类实现中位置处于+1，
//    因此我们添加index节点的时候，在链表实现中找到该index节点.next指向新节点就行了。
// 5. 返回的链表不会携带dummyHead，所以用户得到的链表头节点index为0

// 节点
class Node {
    constructor(e = null, next = null) {
        this.e = e;
        this.next = next;
    }
}

// 链表
class LinkedList {
    constructor() {
        this.dummyHead = new Node();
        this.size = 0;
    }

    // 添加节点
    add(index, e) {

        // 注意index可以取this.size，原因最上面，因为dummyHead的原因，实际添加尾结点在this.size对应节点的next后面。
        if (index < 0 || index > this.size) {
            throw new Error("Add failed. Illegal index");
        };

        // dummyHead指向index为0
        let prev = this.dummyHead;

        // 添加节点的本质是，上一个节点的next指向新节点，然后更新新节点的next
        // index是用户要添加节点的位置，犹豫dummyHead的存在，链表中index可以查找到我们要添加节点位置的上一个节点，通过上一个节点.next指向新节点实现插入。
        // 因为链表没办法直接通过索引获取值，所以通过for循环，不断替换prev，最终找到index对应的值
        for (let i = 0; i < index; i++) {
            prev = prev.next;
        };

        prev.next = new Node(e, prev.next);
        this.size++;

    }

    // 添加头节点-> dummyHead节点的下一个节点即为链表的头节点
    addFirst(e) {
        this.add(0, e);
    };

    // 添加尾结点-> 本质上就是当前的尾结点的next指向新的节点，就完成添加尾结点
    addLast(e) {
        this.add(this.size, e);
    };

    // 获取某个位置的数据
    get(index) {
        if (index < 0 || index > this.size) {
            throw new Error("Get failed. Illegal index");
        };

        let cur = this.dummyHead.next;
        // 通过循环不断替换cur，最终找到对应位置的值。
        for (let i = 0; i < index; i++) {
            cur = cur.next;
        };

        return cur.e;
    };

    getFirst() {
        return this.get(0)
    };

    getLast() {
        // 我们返回的node[index].next.e,需要减1
        return this.get(this.size - 1);
    };

    set(index, e) {
        if (index < 0 || index > this.size) {
            throw new Error("Set failed. Illegal index")
        }

        let cur = this.dummyHead.next;

        for (let i = 0; i < index; i++) {
            cur = cur.next;
        }

        cur.e = e;
    }

    // 判断数据是否存在
    contains(e) {
        let cur = this.dummyHead.next;
        while (cur !== null) {
            if (cur.e === e) {
                return true
            }
            cur = cur.next
        }
        return false;
    }

    remove(index) {
        if (index < 0 || index > this.size) {
            throw new Error('Remove failed. Illegal index')
        }

        let prev = this.dummyHead;
        for (let i = 0; i < index; i++) {
            prev = prev.next;
        }

        let delNode = prev.next;
        prev.next = delNode.next;
        delNode.next = null;
        this.size--;
    }

    removeFirst() {
        this.remove(0)
    }

    removeLast() {
        this.remove(this.size - 1)
    }

    removeElement(el) {
        let prev = this.dummyHead;

        while(prev.next !== null) {
            if(prev.next.e === el) {
                prev.next = prev.next.next;
            } else {
                prev = prev.next;
            }
        }

        this.size--;
        
    }
    
    toString() {
        let ret = '',
        cur = this.dummyHead.next;
        while(cur) {
            ret += `${cur.e}->`;
            cur = cur.next;
        }

        // 最后next指向为null，可加可不加
        ret += 'null';

        console.log(ret);
        return ret;
    }

}

let myLink = new LinkedList();
myLink.addFirst('a')
myLink.addFirst('b')
myLink.addFirst('c')
myLink.addFirst('d')
myLink.addFirst('e')
// myLink.toString()
myLink.addLast('f')
myLink.toString()
console.log(myLink.get(0));
// console.log(myLink.get(3));
// console.log(myLink.getFirst());
// console.log(myLink.getLast());
myLink.set(4, 'a1')
myLink.toString()
console.log(myLink.contains('a1'));
myLink.remove(5)
myLink.removeElement('d')
myLink.toString()




