export function isOutOfScreen(entity, screen, margin = 100){

    const bounds = entity.getBounds();

    return (
        bounds.x + bounds.width < -margin ||
        bounds.x > screen.width + margin ||
        bounds.y + bounds.height < -margin ||
        bounds.y > screen.height + margin
    );
}
