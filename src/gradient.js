import * as d3 from 'd3';
import Kapsule from 'kapsule';

export default Kapsule({
    props: {
        id: {}, // Use with: .attr('fill', 'url(#<gradId>)');
        colorScale: { default: d3.scaleLinear().range(['black', 'white']) },
        angle: { default: 0 } // 0 (left-right), 90 (down-up))
    },
    init(el, state) {
        state.id = `areaGradient${Math.round(Math.random()*10000)}`;
        state.gradient = d3.select(el).append('linearGradient');
    },
    update(state) {
        const rad = Math.PI * state.angle/180;

        state.gradient
            .attr('y1', Math.round(100*Math.max(0, Math.sin(rad))) + '%')
            .attr('y2', Math.round(100*Math.max(0, -Math.sin(rad))) + '%')
            .attr('x1', Math.round(100*Math.max(0, -Math.cos(rad))) + '%')
            .attr('x2', Math.round(100*Math.max(0, Math.cos(rad))) + '%')
            .attr('id', state.id);

        const stopsScale = d3.scaleLinear()
            .domain([0,100])
            .range(state.colorScale.domain());

        let colorStops = state.gradient.selectAll('stop')
            .data(d3.range(0, 100.01, 20)); // 11 stops is sufficient to cover all noticeable color nuances

        colorStops.exit().remove();
        colorStops.merge(colorStops.enter().append('stop'))
            .attr('offset', d => `${d}%`)
            .attr('stop-color', d => state.colorScale(stopsScale(d)));
    }
});