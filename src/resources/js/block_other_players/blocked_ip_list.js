/**
 * Class representing a blocked IP
 */
class BlockedIP {
  /**
   * Create a BlockedIP object
   * @param {string} ip
   * @param {number} [blockedTime]
   * @param {string} [remark]
   */
  constructor(ip, blockedTime = Date.now(), remark = '') {
    this.ip = ip;
    this.blockedTime = blockedTime;
    this.remark = remark;
  }
}

/**
 * Class reperesenting a list of blocked IPs
 */
class BlockedIPList {
  /**
   * Create a BlockedIPLIst obejct
   * @param {number} maxLength
   */
  constructor(maxLength) {
    this._blockedIPs = [];
    this.maxLength = maxLength;
  }

  get length() {
    return this._blockedIPs.length;
  }

  /**
   * Return if the list is full
   * @returns {boolean}
   */
  isFull() {
    return this.length >= this.maxLength;
  }

  /**
   * Add to blocked IP list
   * @param {string} ip
   */
  add(ip) {
    if (this.isFull()) {
      return;
    }
    this._blockedIPs.push(new BlockedIP(ip));
  }

  /**
   * Remove a blocked IP at index from the list
   * @param {number} index
   */
  removeAt(index) {
    this._blockedIPs.splice(index, 1);
  }

  /**
   * Edit remark of a BlockedIP object at index
   * @param {number} index
   * @param {string} newRemark
   */
  editRemarkAt(index, newRemark) {
    this._blockedIPs[index].remark = newRemark;
  }

  /**
   * Create a read-only 2D array whose elements have a structure of [ip, blockedTime, remark].
   * And the elements have same indices as in the this._blockedIPs.
   * @returns {[string, number, string][]}
   */
  createArrayView() {
    return this._blockedIPs.map((blockedIP) => [
      blockedIP.ip,
      blockedIP.blockedTime,
      blockedIP.remark,
    ]);
  }

  /**
   * Read a 2D array which has the same structure of an array created by {@link createArrayView}
   * and update this._blockedIPs from it.
   * @param {[string, number, string][]} arrayView
   */
  readArrayViewAndUpdate(arrayView) {
    arrayView.slice(0, this.maxLength);
    this._blockedIPs = arrayView.map(
      (value) => new BlockedIP(value[0], value[1], value[2])
    );
  }

  /**
   * Create a read-only 1D array whose elements are blocked IP addresses.
   * @returns {[string]}
   */
  createIPArray() {
    // @ts-ignore
    return this._blockedIPs.map((blockedIP) => blockedIP.ip);
  }
}

export const blockedIPList = new BlockedIPList(50);
