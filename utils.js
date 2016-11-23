module.exports = {
  processData(data) {
    if (!data.status) data.status = {};
    data.status['nurture'] = data.status['nurture'] || 0;
    data.status['contact-made'] = data.status['contact-made'] || 0;
    data.status['lead'] = data.status['lead'] || 0;
    data.status['deposit-made'] = data.status['deposit-made'] || 0;
    data.status['dq-financial'] = data.status['dq-financial'] || 0;
    data.status['dq-location'] = data.status['dq-location'] || 0;
    data.status['dq-not-interested'] = data.status['dq-not-interested'] || 0;
    data.status['moved-in'] = data.status['moved-in'] || 0;
    data.status['post-tour'] = data.status['post-tour'] || 0;
    data.status['pre-tour'] = data.status['pre-tour'] || 0;

    if (!data.priority) data.priority = {};
    data.priority['hot'] = data.priority['hot'] || 0;
    data.priority['warm'] = data.priority['warm'] || 0;
    data.priority['cold'] = data.priority['cold'] || 0;

    return data;
  }
};